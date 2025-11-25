import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { paymentService } from '../../services/payment';

const paymentMethods = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: 'card-outline',
    description: 'Pay with Visa, MasterCard, or American Express',
  },
  {
    id: 'chapa',
    name: 'Chapa',
    icon: 'phone-portrait-outline',
    description: 'Pay with mobile money or bank transfer',
  },
  {
    id: 'bank',
    name: 'Bank Transfer',
    icon: 'business-outline',
    description: 'Direct bank transfer',
  },
];

export default function PaymentScreen() {
  const { user } = useAuth();
  const { totalWithFees, clearCart } = useCart();
  const [selectedMethod, setSelectedMethod] = useState('chapa');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (!user) {
      Alert.alert('Error', 'Please login to continue with payment');
      return;
    }

    setIsProcessing(true);

    try {
      const paymentData = {
        amount: totalWithFees,
        currency: 'ETB',
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phone,
        txRef: paymentService.generateTransactionRef(),
        returnUrl: 'wia://payment/success',
        customization: {
          title: 'WIA Albania Payment',
          description: 'Payment for goods and services',
          logo: 'https://via.placeholder.com/100x100?text=WIA',
        },
      };

      const response = await paymentService.initializePayment(paymentData);
      
      // In a real app, you would redirect to the checkout URL
      // For now, we'll simulate a successful payment
      setTimeout(() => {
        setIsProcessing(false);
        handlePaymentSuccess();
      }, 3000);

    } catch (error) {
      setIsProcessing(false);
      Alert.alert('Payment Failed', 'There was an error processing your payment. Please try again.');
    }
  };

  const handlePaymentSuccess = () => {
    Alert.alert(
      'Payment Successful!',
      'Your payment has been processed successfully.',
      [
        {
          text: 'OK',
          onPress: () => {
            clearCart();
            router.replace('/orders');
          },
        },
      ]
    );
  };

  const handlePaymentCancel = () => {
    Alert.alert(
      'Payment Cancelled',
      'Your payment was cancelled. You can try again.',
      [
        {
          text: 'Try Again',
          style: 'default',
        },
        {
          text: 'Go Back',
          onPress: () => router.back(),
          style: 'cancel',
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Payment Method</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Order Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Amount</Text>
            <Text style={styles.totalAmount}>${totalWithFees.toFixed(2)}</Text>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>Select Payment Method</Text>
          {paymentMethods.map(method => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentMethod,
                selectedMethod === method.id && styles.paymentMethodSelected,
              ]}
              onPress={() => setSelectedMethod(method.id)}
            >
              <View style={styles.methodHeader}>
                <View style={styles.methodInfo}>
                  <Ionicons name={method.icon as any} size={24} color="#666" />
                  <View style={styles.methodText}>
                    <Text style={styles.methodName}>{method.name}</Text>
                    <Text style={styles.methodDescription}>{method.description}</Text>
                  </View>
                </View>
                <View style={[
                  styles.radioButton,
                  selectedMethod === method.id && styles.radioButtonSelected,
                ]}>
                  {selectedMethod === method.id && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Payment Details */}
        {selectedMethod === 'card' && (
          <View style={styles.cardSection}>
            <Text style={styles.sectionTitle}>Card Details</Text>
            {/* Card form would go here */}
            <Text style={styles.comingSoon}>Card payment coming soon</Text>
          </View>
        )}

        {selectedMethod === 'chapa' && (
          <View style={styles.chapaSection}>
            <View style={styles.chapaInfo}>
              <Ionicons name="shield-checkmark" size={48} color="#4CAF50" />
              <Text style={styles.chapaTitle}>Secure Payment with Chapa</Text>
              <Text style={styles.chapaDescription}>
                You will be redirected to Chapa's secure payment page to complete your transaction.
              </Text>
            </View>
          </View>
        )}

        {/* Security Notice */}
        <View style={styles.securitySection}>
          <Ionicons name="lock-closed" size={20} color="#4CAF50" />
          <Text style={styles.securityText}>
            Your payment information is secure and encrypted
          </Text>
        </View>
      </ScrollView>

      {/* Payment Footer */}
      <View style={styles.footer}>
        <View style={styles.footerTotal}>
          <Text style={styles.footerTotalLabel}>Total to Pay</Text>
          <Text style={styles.footerTotalValue}>${totalWithFees.toFixed(2)}</Text>
        </View>
        <TouchableOpacity 
          style={[styles.payButton, isProcessing && styles.payButtonDisabled]}
          onPress={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.payButtonText}>
              Pay with {selectedMethod === 'chapa' ? 'Chapa' : 'Card'}
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={handlePaymentCancel}
          disabled={isProcessing}
        >
          <Text style={styles.cancelButtonText}>Cancel Payment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  summarySection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  paymentSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  paymentMethod: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    marginBottom: 12,
  },
  paymentMethodSelected: {
    borderColor: '#FF6B35',
    backgroundColor: '#FFF5F2',
  },
  methodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  methodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  methodText: {
    marginLeft: 12,
    flex: 1,
  },
  methodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  methodDescription: {
    fontSize: 14,
    color: '#666',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#FF6B35',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF6B35',
  },
  cardSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  comingSoon: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    padding: 20,
  },
  chapaSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  chapaInfo: {
    alignItems: 'center',
    padding: 20,
  },
  chapaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  chapaDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  securitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  securityText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  footerTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  footerTotalLabel: {
    fontSize: 16,
    color: '#666',
  },
  footerTotalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  payButton: {
    backgroundColor: '#FF6B35',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  payButtonDisabled: {
    backgroundColor: '#ccc',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
});