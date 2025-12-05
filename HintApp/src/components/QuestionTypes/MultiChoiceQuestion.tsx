import type React from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

interface MultiChoiceQuestionProps {
	question: string;
	options: string[];
	value: string[] | undefined;
	onChange: (value: string[]) => void;
	required?: boolean;
	maxSelections?: number;
}

export const MultiChoiceQuestion: React.FC<MultiChoiceQuestionProps> = ({
	question,
	options,
	value = [],
	onChange,
	required = false,
	maxSelections,
}) => {
	const handleToggle = (option: string) => {
		const currentValues = value || [];
		const isSelected = currentValues.includes(option);

		if (isSelected) {
			onChange(currentValues.filter((v) => v !== option));
		} else {
			if (maxSelections && currentValues.length >= maxSelections) {
				// Remove the first selected item and add the new one
				onChange([...currentValues.slice(1), option]);
			} else {
				onChange([...currentValues, option]);
			}
		}
	};

	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			<Text style={styles.question}>
				{question} {required && <Text style={styles.required}>*</Text>}
			</Text>
			{maxSelections && (
				<Text style={styles.hint}>
					Select up to {maxSelections} options ({value?.length || 0}/
					{maxSelections})
				</Text>
			)}
			<View style={styles.optionsContainer}>
				{options.map((option) => {
					const isSelected = value?.includes(option) || false;
					return (
						<TouchableOpacity
							key={option}
							style={[styles.option, isSelected && styles.selectedOption]}
							onPress={() => handleToggle(option)}
							activeOpacity={0.7}
						>
							<View
								style={[styles.checkbox, isSelected && styles.selectedCheckbox]}
							>
								{isSelected && <Text style={styles.checkmark}>✓</Text>}
							</View>
							<Text
								style={[
									styles.optionText,
									isSelected && styles.selectedOptionText,
								]}
							>
								{option}
							</Text>
						</TouchableOpacity>
					);
				})}
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
		marginBottom: 12,
		paddingHorizontal: 20,
	},
	required: {
		color: "#e74c3c",
	},
	hint: {
		fontSize: 14,
		color: "#7f8c8d",
		marginBottom: 20,
		paddingHorizontal: 20,
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
	checkbox: {
		width: 22,
		height: 22,
		borderRadius: 6,
		borderWidth: 2,
		borderColor: "#95a5a6",
		marginRight: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	selectedCheckbox: {
		backgroundColor: "#3498db",
		borderColor: "#3498db",
	},
	checkmark: {
		color: "white",
		fontSize: 14,
		fontWeight: "bold",
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
