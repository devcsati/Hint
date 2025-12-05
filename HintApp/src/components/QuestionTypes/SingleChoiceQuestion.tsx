import type React from "react";
import type { FC } from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

interface SingleChoiceQuestionProps {
	question: string;
	options: string[];
	value: string | undefined;
	onChange: (value: string) => void;
	required?: boolean;
}

export const SingleChoiceQuestion: React.FC<SingleChoiceQuestionProps> = ({
	question,
	options,
	value,
	onChange,
	required = false,
}) => {
	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			<Text style={styles.question}>
				{question} {required && <Text style={styles.required}>*</Text>}
			</Text>
			<View style={styles.optionsContainer}>
				{options.map((option) => (
					<TouchableOpacity
						key={option}
						style={[styles.option, value === option && styles.selectedOption]}
						onPress={() => onChange(option)}
						activeOpacity={0.7}
					>
						<View
							style={[styles.radio, value === option && styles.selectedRadio]}
						>
							{value === option && <View style={styles.radioInner} />}
						</View>
						<Text
							style={[
								styles.optionText,
								value === option && styles.selectedOptionText,
							]}
						>
							{option}
						</Text>
					</TouchableOpacity>
				))}
			</View>
		</ScrollView>
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
	optionsContainer: {
		paddingHorizontal: 20,
	},
	option: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#f8f9fa",
		padding: 16,
		borderRadius: 12,
		marginBottom: 12,
		borderWidth: 2,
		borderColor: "transparent",
	},
	selectedOption: {
		backgroundColor: "#e8f4f8",
		borderColor: "#3498db",
	},
	radio: {
		width: 20,
		height: 20,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: "#95a5a6",
		marginRight: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	selectedRadio: {
		borderColor: "#3498db",
	},
	radioInner: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: "#3498db",
	},
	optionText: {
		fontSize: 16,
		color: "#34495e",
		flex: 1,
	},
	selectedOptionText: {
		color: "#2c3e50",
		fontWeight: "500",
	},
});
