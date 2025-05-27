import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
  Easing,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path, Circle } from "react-native-svg";

const { width } = Dimensions.get("window");

const LoginScreen = ({navigation}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    rememberMe: false,
  });

  // Animation refs
  const shieldSlide = useRef(new Animated.Value(-100)).current;
  const shieldGlow = useRef(new Animated.Value(0.5)).current;
  const formOpacity = useRef(new Animated.Value(0)).current;
  const formTranslate = useRef(new Animated.Value(30)).current;
  const tabIndicator = useRef(new Animated.Value(0)).current;
  const microcopyOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Shield slide in animation
    Animated.sequence([
      Animated.timing(shieldSlide, {
        toValue: 0,
        duration: 1200,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
      Animated.parallel([
        // Form fade in
        Animated.timing(formOpacity, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        // Form slide up
        Animated.timing(formTranslate, {
          toValue: 0,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        // Microcopy fade in
        Animated.timing(microcopyOpacity, {
          toValue: 1,
          duration: 1000,
          delay: 400,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Shield glow animation
    const glowLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(shieldGlow, {
          toValue: 1,
          duration: 2500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(shieldGlow, {
          toValue: 0.5,
          duration: 2500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    glowLoop.start();

    return () => glowLoop.stop();
  }, []);

  const handleTabChange = (loginTab) => {
    setIsLogin(loginTab);
    Animated.timing(tabIndicator, {
      toValue: loginTab ? 0 : 1,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const ShieldIcon = () => (
    <Svg width="60" height="60" viewBox="0 0 60 60">
      <Path
        d="M30 5L45 12.5V27.5C45 37.5 37.5 45 30 55C22.5 45 15 37.5 15 27.5V12.5L30 5Z"
        fill="#4A90E2"
        stroke="#3A7BD5"
        strokeWidth="1.5"
      />
      <Circle cx="30" cy="27.5" r="6" fill="#FFFFFF" />
    </Svg>
  );

  const tabIndicatorTranslate = tabIndicator.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width * 0.4],
  });

  const handleOnClick = (buttonType) =>{
    if (buttonType === "login") {
      // Handle login logic
      console.log("Login button clicked");
    } else if (buttonType === "otp") {
        console.log("OTP button clicked");
    }
    else{  
      console.log("Sign Up button clicked");
    }

    navigation.replace('Home');
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />

      <LinearGradient
        colors={["#F3F4F6", "#FFFFFF"]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header with animated shield */}
          <View style={styles.header}>
            <Animated.View
              style={[
                styles.shieldContainer,
                {
                  transform: [{ translateY: shieldSlide }],
                  opacity: shieldGlow,
                },
              ]}
            >
              <View style={styles.shieldGlow} />
              <ShieldIcon />
            </Animated.View>

            <Text style={styles.title}>Welcome to HomeShield AI</Text>
            <Text style={styles.subtitle}>
              Secure your home, gadgets, and peace of mind — in just a few taps.
            </Text>
          </View>

          {/* Animated form container */}
          <Animated.View
            style={[
              styles.formContainer,
              {
                opacity: formOpacity,
                transform: [{ translateY: formTranslate }],
              },
            ]}
          >
            {/* Tab switcher */}
            <View style={styles.tabContainer}>
              <View style={styles.tabBackground}>
                <Animated.View
                  style={[
                    styles.tabIndicator,
                    {
                      transform: [{ translateX: tabIndicatorTranslate }],
                    },
                  ]}
                />
                <TouchableOpacity
                  style={styles.tab}
                  onPress={() => handleTabChange(true)}
                >
                  <Text
                    style={[styles.tabText, isLogin && styles.activeTabText]}
                  >
                    Login
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.tab}
                  onPress={() => handleTabChange(false)}
                >
                  <Text
                    style={[styles.tabText, !isLogin && styles.activeTabText]}
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Form fields */}
            <View style={styles.formFields}>
              {!isLogin && (
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>👤 Full Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChangeText={(text) =>
                      setFormData({ ...formData, fullName: text })
                    }
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              )}

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>
                  📱 {isLogin ? "Phone Number or Email" : "Phone Number"}
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder={
                    isLogin ? "Enter phone or email" : "Enter phone number"
                  }
                  value={isLogin ? formData.email : formData.phone}
                  onChangeText={(text) =>
                    setFormData({
                      ...formData,
                      [isLogin ? "email" : "phone"]: text,
                    })
                  }
                  placeholderTextColor="#9CA3AF"
                  keyboardType={isLogin ? "default" : "phone-pad"}
                />
              </View>

              {!isLogin && (
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>✉️ Email</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChangeText={(text) =>
                      setFormData({ ...formData, email: text })
                    }
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                  />
                </View>
              )}

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>
                  🔑 {isLogin ? "Password" : "Create Password"}
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder={
                    isLogin ? "Enter password" : "Create a strong password"
                  }
                  value={formData.password}
                  onChangeText={(text) =>
                    setFormData({ ...formData, password: text })
                  }
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry
                />
              </View>

              {isLogin && (
                <TouchableOpacity
                  style={styles.rememberContainer}
                  onPress={() =>
                    setFormData({
                      ...formData,
                      rememberMe: !formData.rememberMe,
                    })
                  }
                >
                  <View
                    style={[
                      styles.checkbox,
                      formData.rememberMe && styles.checkboxActive,
                    ]}
                  >
                    {formData.rememberMe && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </View>
                  <Text style={styles.rememberText}>🔒 Remember me</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.primaryButton}
            
                onPress={() => handleOnClick(isLogin ? "login" : "signup")}>
                <LinearGradient
                  colors={["#4A90E2", "#3A7BD5"]}
                  style={styles.buttonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.primaryButtonText}>
                    {isLogin ? "Login & Continue" : "Secure My Account"}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              {isLogin && (
                <TouchableOpacity style={styles.secondaryButton} 
                onPress={() => handleOnClick("otp")}
                >
                  <Text style={styles.secondaryButtonText} >
                    Sign in with OTP
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Microcopy */}
            <Animated.View
              style={[styles.microcopyContainer, { opacity: microcopyOpacity }]}
            >
              <Text style={styles.microcopy}>
                ⚡ Fast onboarding. Zero paperwork.
              </Text>
            </Animated.View>

            {/* Footer */}
            <Text style={styles.footer}>
              By continuing, you agree to our{" "}
              <Text style={styles.footerLink}>Terms & Privacy Policy</Text>
            </Text>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 40,
  },
  shieldContainer: {
    position: "relative",
    marginBottom: 20,
  },
  shieldGlow: {
    position: "absolute",
    top: -15,
    left: -15,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#4A90E2",
    opacity: 0.15,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 8,
    fontFamily: "System",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
    fontFamily: "System",
  },
  formContainer: {
    flex: 1,
  },
  tabContainer: {
    marginBottom: 32,
  },
  tabBackground: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 4,
    flexDirection: "row",
    position: "relative",
  },
  tabIndicator: {
    position: "absolute",
    top: 4,
    left: 4,
    width: width * 0.4 - 20,
    height: 44,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    zIndex: 1,
  },
  tabText: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "600",
    fontFamily: "System",
  },
  activeTabText: {
    color: "#1F2937",
  },
  formFields: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "500",
    marginBottom: 8,
    fontFamily: "System",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#1F2937",
    fontFamily: "System",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    borderRadius: 4,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxActive: {
    backgroundColor: "#4A90E2",
    borderColor: "#4A90E2",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  rememberText: {
    fontSize: 14,
    color: "#6B7280",
    fontFamily: "System",
  },
  buttonContainer: {
    marginBottom: 24,
  },
  primaryButton: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonGradient: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "System",
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: "#4A90E2",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "System",
  },
  microcopyContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  microcopy: {
    fontSize: 14,
    color: "#10B981",
    fontWeight: "500",
    marginBottom: 4,
    fontFamily: "System",
  },
  footer: {
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "center",
    lineHeight: 18,
    paddingBottom: 40,
    fontFamily: "System",
  },
  footerLink: {
    color: "#4A90E2",
    fontWeight: "500",
  },
});

export default LoginScreen;
