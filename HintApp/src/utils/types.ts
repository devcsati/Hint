export type QuestionType = "single" | "multi" | "scale" | "text";

export type OnboardingSection =
	| "relationship"
	| "love_language"
	| "budget"
	| "additional";

export interface OnboardingQuestion {
	id: string;
	section: OnboardingSection;
	question: string;
	type: QuestionType;
	options?: string[];
	required: boolean;
	placeholder?: string;
	maxSelections?: number;
}

export interface OnboardingAnswers {
	[questionId: string]: string | string[] | number;
}

export interface OnboardingState {
	currentQuestionIndex: number;
	answers: OnboardingAnswers;
	completed: boolean;
}
