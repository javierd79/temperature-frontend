import { Card, Divider, Text } from "@mantine/core"
import { useState } from "react";

const statues = {
  connected: 'Conectado',
  disconnected: 'Desconectado',
  connecting: 'Conectando...',
  disconnecting: 'Desconectando...'
}

const colors = {
  connected: '#2f9e44',
  disconnected: '#e03131',
  connecting: '#e8590c',
  disconnecting: 'purple'
}

function CardConnection() {
  const [status, setStatus] = useState<'connected' | 'disconnected' | 'connecting' | 'disconnecting'>('disconnected');

  return (
    <Card h="140px" bg="rgb(31, 31, 31)" style={{ border: `3px solid ${colors[status as keyof typeof colors]}` }}>
      <Text ta="start" mt={-10} fz={17} fw={700} c="white">
        Estado del Servidor:
      </Text>
      <Divider color="#868E96" label={
        <Text ta="center" c="white" fw={100} fz={14}>
          {statues[status as keyof typeof statues]}
        </Text>
      } />
    </Card>
  )
}

export default CardConnection