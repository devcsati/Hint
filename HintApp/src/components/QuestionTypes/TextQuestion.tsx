import type React from "react";
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";

interface TextQuestionProps {
	question: string;
	value: string | undefined;
	onChange: (value: string) => void;
	required?: boolean;
	placeholder?: string;
}

export const TextQuestion: React.FC<TextQuestionProps> = ({
	question,
	value = "",
	onChange,
	required = false,
	placeholder,
}) => {
	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Text style={styles.question}>
					{question} {required && <Text style={styles.required}>*</Text>}
				</Text>
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.textInput}
						value={value}
						onChangeText={onChange}
						placeholder={placeholder || "Type your answer here..."}
						placeholderTextColor="#95a5a6"
						multiline
						numberOfLines={4}
						textAlignVertical="top"
					/>
					<Text style={styles.characterCount}>{value.length} characters</Text>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	question: {
		fontSize: 20,
		fontWeight: "600",
		color: "#2c3e50",
		marginBottom: 24,
		paddingHorizontal: 20,
	},
	required: {
		color: "#e74c3c",
	},
	inputContainer: {
		paddingHorizontal: 20,
	},
	textInput: {
		backgroundColor: "#f8f9fa",
		borderWidth: 2,
		borderColor: "#e1e8ed",
		borderRadius: 12,
		padding: 16,
		fontSize: 16,
		color: "#2c3e50",
		minHeight: 120,
		maxHeight: 200,
	},
	characterCount: {
		fontSize: 12,
		color: "#95a5a6",
		marginTop: 8,
		textAlign: "right",
	},
});
