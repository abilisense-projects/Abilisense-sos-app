import React from "react";
import { SERVER_BASE_URL } from '@env';
import { TouchableOpacity, View } from "react-native";

const CancelAlertButton = () => {
    const url = `${SERVER_BASE_URL}/api/alerts/delete-by-status/`;
    const handleCancelAlert = () => {
        const statusToDelete = "AA";
        

    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.submitButton} onPress={() => handleCancelAlert()}>
                <Text style={styles.submitButtonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CancelAlertButton;