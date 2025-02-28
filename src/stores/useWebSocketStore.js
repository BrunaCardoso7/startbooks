
import { ref } from 'vue'

export function useWebSocketStore() {
    const notification = ref('')
    const socket = ref(null)

    const initWebSocket = () => {
        socket.value = new WebSocket('wss://startbook-api.onrender.com/ws/notifications/')
        
        socket.value.onmessage = (event) => {
        const data = JSON.parse(event.data)
        
        if (data.message) {
            notification.value = data.message 
        }
        }
        
        socket.value.onerror = (error) => {
        console.error('WebSocket error:', error)
        }
    }

    const closeWebSocket = () => {
        if (socket.value) {
        socket.value.close()
        }
    }

    return {
        notification,
        initWebSocket,
        closeWebSocket
    }
}
