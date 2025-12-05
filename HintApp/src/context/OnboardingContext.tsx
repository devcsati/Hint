import AsyncStorage from "@react-native-async-storage/async-storage";
import type React from "react";
import { type ReactNode, createContext, useContext, useState } from "react";
import { OnboardingAnswers, type OnboardingState } from "../utils/types";

interface OnboardingContextType extends OnboardingState {
	updateAnswer: (
		questionId: string,
		answer: string | string[] | number,
	) => void;
	nextQuestion: () => void;
	previousQuestion: () => void;
	saveOnboarding: () => Promise<void>;
	resetOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
	undefined,
);

export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [state, setState] = useState<OnboardingState>({
		currentQuestionIndex: 0,
		answers: {},
		completed: false,
	});

	const updateAnswer = (
		questionId: string,
		answer: string | string[] | number,
	) => {
		setState((prev) => ({
			...prev,
			answers: {
				...prev.answers,
				[questionId]: answer,
			},
		}));
	};

	const nextQuestion = () => {
		setState((prev) => ({
			...prev,
			currentQuestionIndex: prev.currentQuestionIndex + 1,
		}));
	};

	const previousQuestion = () => {
		setState((prev) => ({
			...prev,
			currentQuestionIndex: Math.max(0, prev.currentQuestionIndex - 1),
		}));
	};

	const saveOnboarding = async () => {
		try {
			await AsyncStorage.setItem(
				"onboarding_answers",
				JSON.stringify(state.answers),
			);
			await AsyncStorage.setItem("onboarding_completed", "true");
			setState((prev) => ({ ...prev, completed: true }));
			console.log("Onboarding saved successfully:", state.answers);
		} catch (error) {
			console.error("Failed to save onboarding:", error);
			throw error;
		}
	};

	const resetOnboarding = () => {
		setState({
			currentQuestionIndex: 0,
			answers: {},
			completed: false,
		});
	};

	return (
		<OnboardingContext.Provider
			value={{
				...state,
				updateAnswer,
				nextQuestion,
				previousQuestion,
				saveOnboarding,
				resetOnboarding,
			}}
		>
			{children}
		</OnboardingContext.Provider>
	);
};

export const useOnboarding = () => {
	const context = useContext(OnboardingContext);
	if (!context) {
		throw new Error("useOnboarding must be used within OnboardingProvider");
	}
	return context;
};
