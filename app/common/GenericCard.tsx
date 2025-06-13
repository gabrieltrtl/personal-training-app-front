import React from "react";
import { Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native'

interface GenericCardProps {
  title: string;
  subtitle?: string;
  onPress: () => void;
  style?: ViewStyle;
  textColor?: string;
}

export default function GenericCard({
  title,
  subtitle,
  onPress,
  style,
  textColor,
}: GenericCardProps) {
  return (
    <TouchableOpacity style={[styles.card, style]} onPress={onPress}>
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 10,
  }
});