import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notifications: []
};

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotification: (state, action) => {
            state.notifications.push(action.payload);
        },
        removeNotification: (state, action) => {
            state.notifications = state.notifications.filter(
                notification => notification.id !== action.payload
            );
        },
        markAsRead: (state, action) => {
            const notification = state.notifications.find(
            notification => notification.id === action.payload
            );
            if (notification) {
            notification.read = true;
            }
        },
        clearNotifications: (state) => {
            state.notifications = [];
        }
    }
});

export const { addNotification, removeNotification, markAsRead, clearNotifications } = notificationSlice.actions;

export default notificationSlice.reducer;