import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { OnboardingProvider } from "./src/context/OnboardingContext";
import OnboardingScreen from "./src/screens/OnboardingScreen";

export default function App() {
	const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<
		boolean | null
	>(null);
	const [showOnboarding, setShowOnboarding] = useState(false);

	useEffect(() => {
		checkOnboardingStatus();
	}, []);

	const checkOnboardingStatus = async () => {
		try {
			const completed = await AsyncStorage.getItem("onboarding_completed");
			setHasCompletedOnboarding(completed === "true");
		} catch (error) {
			console.error("Error checking onboarding status:", error);
			setHasCompletedOnboarding(false);
		}
	};

	const resetOnboarding = async () => {
		try {
			await AsyncStorage.removeItem("onboarding_completed");
			await AsyncStorage.removeItem("onboarding_answers");
			setShowOnboarding(true);
		} catch (error) {
			console.error("Error resetting onboarding:", error);
		}
	};

	if (hasCompletedOnboarding === null) {
		return (
			<View style={[styles.container, styles.centerContent]}>
				<ActivityIndicator size="large" color="#3498db" />
			</View>
		);
	}

	if (!hasCompletedOnboarding || showOnboarding) {
		return (
			<OnboardingProvider>
				<OnboardingScreen />
				<StatusBar style="auto" />
			</OnboardingProvider>
		);
	}

	return (
		<ScrollView contentContainerStyle={styles.scrollContainer}>
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.title}>💕 Hint App</Text>
					<Text style={styles.subtitle}>
						Your daily romantic mission generator
					</Text>
				</View>

				<View style={styles.card}>
					<Text style={styles.cardTitle}>Welcome Back!</Text>
					<Text style={styles.welcomeText}>
						Your preferences have been saved. Ready for romantic adventures!
					</Text>
				</View>

				<View style={styles.card}>
					<Text style={styles.cardTitle}>Today's Mission</Text>
					<Text style={styles.missionEmoji}>📝</Text>
					<Text style={styles.missionText}>
						Send your partner a sweet message telling them what you appreciate
						about them
					</Text>
				</View>

				<View style={styles.infoCard}>
					<Text style={styles.infoTitle}>📱 Quick Actions:</Text>
					<TouchableOpacity
						style={styles.actionButton}
						onPress={resetOnboarding}
					>
						<Text style={styles.actionButtonText}>⚙️ Update Preferences</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.actionButton}>
						<Text style={styles.actionButtonText}>📅 View Mission History</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.actionButton}>
						<Text style={styles.actionButtonText}>🎲 Get New Mission</Text>
					</TouchableOpacity>
				</View>

				<StatusBar style="auto" />
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	scrollContainer: {
		flexGrow: 1,
	},
	container: {
		flex: 1,
		backgroundColor: "#f0f4f8",
		paddingTop: 50,
		paddingHorizontal: 20,
	},
	centerContent: {
		justifyContent: "center",
		alignItems: "center",
	},
	header: {
		alignItems: "center",
		marginBottom: 30,
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
		color: "#2c3e50",
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 16,
		color: "#7f8c8d",
		textAlign: "center",
	},
	card: {
		backgroundColor: "#fff",
		borderRadius: 15,
		padding: 20,
		marginBottom: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
		elevation: 5,
	},
	cardTitle: {
		fontSize: 20,
		fontWeight: "600",
		color: "#34495e",
		textAlign: "center",
		marginBottom: 16,
	},
	welcomeText: {
		fontSize: 14,
		color: "#7f8c8d",
		textAlign: "center",
		lineHeight: 20,
	},
	missionEmoji: {
		fontSize: 48,
		textAlign: "center",
		marginBottom: 16,
	},
	missionText: {
		fontSize: 16,
		color: "#34495e",
		textAlign: "center",
		lineHeight: 24,
	},
	infoCard: {
		backgroundColor: "#ecf0f1",
		borderRadius: 15,
		padding: 20,
		marginBottom: 20,
	},
	infoTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#2c3e50",
		marginBottom: 16,
	},
	actionButton: {
		backgroundColor: "#fff",
		paddingVertical: 14,
		paddingHorizontal: 16,
		borderRadius: 8,
		marginBottom: 10,
		borderWidth: 1,
		borderColor: "#e1e8ed",
	},
	actionButtonText: {
		fontSize: 15,
		color: "#34495e",
		fontWeight: "500",
	},
});
