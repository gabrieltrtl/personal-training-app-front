// app/trainer/dashboard/diet-library/DietLibraryScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import CreateEntityModal from '@/common/modals/CreateEntityModal';

interface Diet {
  id: string;
  name: string;
}

export default function DietLibraryScreen() {
  const router = useRouter();
  const [diets, setDiets] = useState<Diet[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchDiets();
  }, []);

  const fetchDiets = async () => {
    try {
      const response = await axios.get('http://192.168.1.6:3000/diets');
      setDiets(response.data);
    } catch (err) {
      console.error('Erro ao buscar dietas:', err);
      Alert.alert('Erro', 'Não foi possível carregar as dietas.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDiet = async (name: string) => {
    try {
      await axios.post('http://192.168.1.6:3000/diets', { name });
      await fetchDiets();
    } catch (error) {
      console.error('Erro ao criar dieta:', error);
      Alert.alert('Erro', 'Não foi possível criar a dieta.');
    } finally {
      setShowModal(false);
    }
  };

  const handleDelete = (dietId: string) => {
    Alert.alert('Confirmar exclusão', 'Deseja excluir esta dieta?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await axios.delete(`http://192.168.1.6:3000/diets/${dietId}`);
            fetchDiets();
          } catch (error) {
            console.error('Erro ao excluir dieta:', error);
            Alert.alert('Erro', 'Não foi possível excluir a dieta.');
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: Diet }) => {
    console.log('🔍 Roteando para:', `/trainer/diet-library/meals/${item.id}`);
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => {
          console.log('ID da dieta clicada:', item.id);
          router.push(`/trainer/diet-library/meals/${item.id}`);
        }}
      >
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation(); // evita que o clique no botão exclua e navegue ao mesmo tempo
              handleDelete(item.id);
            }}
          >
            <Text style={[styles.actionText, { color: 'red' }]}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.newButton} onPress={() => setShowModal(true)}>
        <Text style={styles.newButtonText}>+ Nova Dieta</Text>
      </TouchableOpacity>

      {/* ✅ USO DO MODAL */}
      <CreateEntityModal
        visible={showModal}
        title="Criar Dieta"
        onCreate={handleCreateDiet}
        onClose={() => setShowModal(false)}
      />

      <FlatList
        data={diets}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  newButton: {
    backgroundColor: '#6C4AB6',
    padding: 14,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  newButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  card: {
    backgroundColor: '#F9F9F9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 2,
  },
  cardContent: {
    // ✅ ADICIONADO: linha horizontal entre nome e botão
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  actionText: { color: '#6C4AB6', fontWeight: 'bold' },
});
