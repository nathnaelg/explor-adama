import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  style?: ViewStyle;
  animationType?: 'slide' | 'fade' | 'none';
  transparent?: boolean;
}

export interface AlertModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  type?: 'success' | 'error' | 'warning' | 'info';
}

export interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  height?: number | string;
}