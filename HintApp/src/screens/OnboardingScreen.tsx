import type React from "react";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import {
	MultiChoiceQuestion,
	SingleChoiceQuestion,
	TextQuestion,
} from "../components/QuestionTypes";
import { useOnboarding } from "../context/OnboardingContext";
import questionsData from "../data/onboardingQuestions.json";
import type { OnboardingQuestion } from "../utils/types";

const questions = questionsData as OnboardingQuestion[];

const OnboardingScreen: React.FC = () => {
	const {
		currentQuestionIndex,
		answers,
		updateAnswer,
		nextQuestion,
		previousQuestion,
		saveOnboarding,
		completed,
	} = useOnboarding();

	const [isSubmitting, setIsSubmitting] = useState(false);

	const currentQuestion = questions[currentQuestionIndex];
	const isLastQuestion = currentQuestionIndex === questions.length - 1;
	const isFirstQuestion = currentQuestionIndex === 0;
	const currentAnswer = answers[currentQuestion?.id];

	const getSectionTitle = (section: string): string => {
		switch (section) {
			case "relationship":
				return "Relationship & Personality";
			case "love_language":
				return "Love Language";
			case "budget":
				return "Monthly Budget";
			case "additional":
				return "Additional Information";
			default:
				return "";
		}
	};

	const canProceed = (): boolean => {
		if (!currentQuestion.required) return true;

		if (currentQuestion.type === "text") {
			return !!currentAnswer && (currentAnswer as string).trim().length > 0;
		}
		if (currentQuestion.type === "multi") {
			return !!currentAnswer && (currentAnswer as string[]).length > 0;
		}
		return !!currentAnswer;
	};

	const handleNext = async () => {
		if (!canProceed() && currentQuestion.required) {
			Alert.alert(
				"Required Field",
				"Please answer this question before continuing.",
				[{ text: "OK" }],
			);
			return;
		}

		if (isLastQuestion) {
			setIsSubmitting(true);
			try {
				await saveOnboarding();
				Alert.alert(
					"Success! 🎉",
					"Your preferences have been saved. Get ready for daily romantic missions!",
					[{ text: "Start Exploring" }],
				);
			} catch (error) {
				Alert.alert(
					"Error",
					"Failed to save your preferences. Please try again.",
					[{ text: "OK" }],
				);
			} finally {
				setIsSubmitting(false);
			}
		} else {
			nextQuestion();
		}
	};

	const renderQuestion = () => {
		if (!currentQuestion) return null;

		switch (currentQuestion.type) {
			case "single":
				return (
					<SingleChoiceQuestion
						question={currentQuestion.question}
						options={currentQuestion.options || []}
						value={currentAnswer as string}
						onChange={(value) => updateAnswer(currentQuestion.id, value)}
						required={currentQuestion.required}
					/>
				);
			case "multi":
				return (
					<MultiChoiceQuestion
						question={currentQuestion.question}
						options={currentQuestion.options || []}
						value={currentAnswer as string[]}
						onChange={(value) => updateAnswer(currentQuestion.id, value)}
						required={currentQuestion.required}
						maxSelections={currentQuestion.maxSelections}
					/>
				);
			case "text":
				return (
					<TextQuestion
						question={currentQuestion.question}
						value={currentAnswer as string}
						onChange={(value) => updateAnswer(currentQuestion.id, value)}
						required={currentQuestion.required}
						placeholder={currentQuestion.placeholder}
					/>
				);
			default:
				return null;
		}
	};

	const progressPercentage =
		((currentQuestionIndex + 1) / questions.length) * 100;

	if (completed) {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.completedContainer}>
					<Text style={styles.completedEmoji}>💕</Text>
					<Text style={styles.completedTitle}>Welcome to Hint!</Text>
					<Text style={styles.completedSubtitle}>
						Your personalized romantic journey begins now.
					</Text>
				</View>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<View style={styles.progressContainer}>
					<View style={styles.progressBar}>
						<View
							style={[styles.progressFill, { width: `${progressPercentage}%` }]}
						/>
					</View>
					<Text style={styles.progressText}>
						{currentQuestionIndex + 1} of {questions.length}
					</Text>
				</View>
				<Text style={styles.sectionTitle}>
					{getSectionTitle(currentQuestion?.section)}
				</Text>
			</View>

			<View style={styles.questionContainer}>{renderQuestion()}</View>

			<View style={styles.navigationContainer}>
				<TouchableOpacity
					style={[
						styles.navButton,
						styles.backButton,
						isFirstQuestion && styles.disabledButton,
					]}
					onPress={previousQuestion}
					disabled={isFirstQuestion}
				>
					<Text
						style={[
							styles.navButtonText,
							isFirstQuestion && styles.disabledButtonText,
						]}
					>
						Back
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[
						styles.navButton,
						styles.nextButton,
						!canProceed() && currentQuestion?.required && styles.disabledButton,
					]}
					onPress={handleNext}
					disabled={
						isSubmitting || (!canProceed() && currentQuestion?.required)
					}
				>
					{isSubmitting ? (
						<ActivityIndicator size="small" color="#fff" />
					) : (
						<Text style={styles.navButtonText}>
							{isLastQuestion ? "Complete" : "Next"}
						</Text>
					)}
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	header: {
		paddingHorizontal: 20,
		paddingTop: 20,
		paddingBottom: 10,
	},
	progressContainer: {
		marginBottom: 20,
	},
	progressBar: {
		height: 4,
		backgroundColor: "#e1e8ed",
		borderRadius: 2,
		overflow: "hidden",
	},
	progressFill: {
		height: "100%",
		backgroundColor: "#3498db",
		borderRadius: 2,
	},
	progressText: {
		fontSize: 12,
		color: "#7f8c8d",
		marginTop: 8,
		textAlign: "center",
	},
	sectionTitle: {
		fontSize: 14,
		fontWeight: "600",
		color: "#95a5a6",
		textAlign: "center",
		textTransform: "uppercase",
		letterSpacing: 1,
	},
	questionContainer: {
		flex: 1,
		paddingTop: 20,
	},
	navigationContainer: {
		flexDirection: "row",
		paddingHorizontal: 20,
		paddingVertical: 20,
		borderTopWidth: 1,
		borderTopColor: "#e1e8ed",
	},
	navButton: {
		flex: 1,
		paddingVertical: 14,
		borderRadius: 8,
		alignItems: "center",
		marginHorizontal: 8,
	},
	backButton: {
		backgroundColor: "#ecf0f1",
	},
	nextButton: {
		backgroundColor: "#3498db",
	},
	disabledButton: {
		opacity: 0.5,
	},
	navButtonText: {
		fontSize: 16,
		fontWeight: "600",
		color: "#2c3e50",
	},
	disabledButtonText: {
		color: "#95a5a6",
	},
	completedContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 40,
	},
	completedEmoji: {
		fontSize: 80,
		marginBottom: 24,
	},
	completedTitle: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#2c3e50",
		marginBottom: 12,
		textAlign: "center",
	},
	completedSubtitle: {
		fontSize: 16,
		color: "#7f8c8d",
		textAlign: "center",
		lineHeight: 24,
	},
});

export default OnboardingScreen;
