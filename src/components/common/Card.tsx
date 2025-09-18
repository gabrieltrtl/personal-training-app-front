import React from 'react'
import { View, Text, Pressable, StyleSheet, ViewStyle } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export type CardProps = {
  title: string;
  subtitle?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  style?: ViewStyle;
}

export default function Card({ title, subtitle, icon, onPress, style }: CardProps) {
  return (
    <Pressable 
      style={({ pressed }) => [styles.card, pressed && styles.pressed, style]}
      onPress={onPress}
      android_ripple={{ color: "#ECECEC" }}
    >
      <View style={styles.row}>
        {icon && (
          <View style={styles.iconWrap}>
            <Ionicons name={icon} size={22} />
          </View>
        )}
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        <Ionicons name='chevron-forward' size={18} style={{ opacity: 0.6 }} />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    elevation: 2, // Android sombra
    shadowColor: "#000", // iOS sombra
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 12,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 16, fontWeight: "700" },
  subtitle: { fontSize: 12, opacity: 0.7 },
});

