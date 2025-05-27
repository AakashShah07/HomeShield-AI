// screens/SplashScreen.js
import React, { useEffect, useRef, useState } from 'react';
import {   View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
  Easing, ActivityIndicator } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Rect, Ellipse } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const shieldPulse = useRef(new Animated.Value(1)).current;
  const homeOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity1 = useRef(new Animated.Value(0)).current;
  const textOpacity2 = useRef(new Animated.Value(0)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const loadingRotation = useRef(new Animated.Value(0)).current;
  
  const [showText1, setShowText1] = useState(false);
  const [showText2, setShowText2] = useState(false);


   useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); // Go to Login after 2 seconds
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigation]);

  useEffect(() => {
    // Shield pulsing animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shieldPulse, {
          toValue: 1.2,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(shieldPulse, {
          toValue: 1,
          duration: 2200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );


    // Glow effect
    const glowAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(glowOpacity, {
          toValue: 0.8,
          duration: 2200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(glowOpacity, {
          toValue: 0.3,
          duration: 2200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    // Loading rotation
    const rotateAnimation = Animated.loop(
      Animated.timing(loadingRotation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    // Start animations
    pulseAnimation.start();
    glowAnimation.start();
    rotateAnimation.start();

    // Sequential home sketch animation
    setTimeout(() => {
      Animated.timing(homeOpacity, {
        toValue: 1,
        duration: 100,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }, 1000);


    return () => {
      pulseAnimation.stop();
      glowAnimation.stop();
      rotateAnimation.stop();
    };
  }, []);

  const ShieldIcon = () => (
    <Svg width="120" height="120" viewBox="0 0 120 120">
      <Path
        d="M60 10L90 25V55C90 75 75 90 60 110C45 90 30 75 30 55V25L60 10Z"
        fill="#4A90E2"
        stroke="#3A7BD5"
        strokeWidth="2"
      />
      <Path
        d="M60 25L75 35V55C75 68 68 78 60 88C52 78 45 68 45 55V35L60 25Z"
        fill="#5BA0F2"
      />
      <Circle cx="60" cy="55" r="8" fill="#FFFFFF" />
    </Svg>
  );

  const HomeIllustration = () => (
    <Animated.View style={[styles.homeContainer, { opacity: homeOpacity }]}>
      <Svg width="300" height="200" viewBox="0 0 300 200">
        {/* House outline */}
        <Path
          d="M50 150 L50 100 L150 50 L250 100 L250 150 Z"
          fill="none"
          stroke="#E8F4FD"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        
        {/* Fridge */}
        <Rect x="70" y="110" width="25" height="40" fill="none" stroke="#E8F4FD" strokeWidth="1.5" />
        <Circle cx="90" cy="125" r="2" fill="#E8F4FD" />
        
        {/* TV */}
        <Rect x="140" y="120" width="40" height="25" fill="none" stroke="#E8F4FD" strokeWidth="1.5" />
        <Rect x="155" y="145" width="10" height="8" fill="none" stroke="#E8F4FD" strokeWidth="1" />
        
        {/* Sofa */}
        <Path
          d="M200 140 L230 140 L230 135 L235 135 L235 150 L195 150 L195 135 L200 135 Z"
          fill="none"
          stroke="#E8F4FD"
          strokeWidth="1.5"
        />
        
        {/* Smartphone */}
        <Rect x="120" y="160" width="12" height="20" rx="2" fill="none" stroke="#E8F4FD" strokeWidth="1.5" />
        <Circle cx="126" cy="175" r="1.5" fill="#E8F4FD" />
      </Svg>
    </Animated.View>
  );

  const rotateInterpolate = loadingRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E6F0FF" />
      
      <LinearGradient
        colors={['#E6F0FF', '#FFFFFF']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        {/* Glow effect behind shield */}
        <Animated.View 
          style={[
            styles.glowEffect,
            {
              opacity: glowOpacity,
              transform: [{ scale: shieldPulse }],
            }
          ]}
        />

        {/* Main content */}
        <View style={styles.centerContent}>
          {/* Logo and title */}
          <View style={styles.header}>
            <Text style={styles.logo}>🛡️</Text>
            <Text style={styles.title}>HomeShield AI</Text>
            <Text style={styles.tagline}>"Intelligent Protection for Your Peace of Mind"</Text>
          </View>

          {/* Animated shield */}
          <Animated.View
            style={[
              styles.shieldContainer,
              {
                transform: [{ scale: shieldPulse }],
              }
            ]}
          >
            <ShieldIcon />
          </Animated.View>

          {/* Home illustration */}
          <HomeIllustration />

         

          {/* Loading indicator */}
          <Animated.View
            style={[
              styles.loadingContainer,
              {
                transform: [{ rotate: rotateInterpolate }],
              }
            ]}
          >
            <View style={styles.loadingDot} />
            <View style={[styles.loadingDot, styles.loadingDot2]} />
            <View style={[styles.loadingDot, styles.loadingDot3]} />
          </Animated.View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 32,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2C3E50',
    textAlign: 'center',
    fontFamily: 'System', // Use Poppins if available
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    fontStyle: 'italic',
    fontFamily: 'System',
  },
  shieldContainer: {
    marginVertical: 20,
    zIndex: 2,
  },
  glowEffect: {
    position: 'absolute',
    top: height * 0.35,
    left: width * 0.5 - 75,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#4A90E2',
    opacity: 0.3,
    zIndex: 1,
  },
  homeContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  textContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  textContainer2: {
    marginTop: 15,
    alignItems: 'center',
  },
  mainText: {
    fontSize: 18,
    color: '#34495E',
    textAlign: 'center',
    lineHeight: 26,
    fontFamily: 'System',
    fontWeight: '500',
  },
  priceText: {
    fontSize: 20,
    color: '#E74C3C',
    fontWeight: '700',
  },
  secondaryText: {
    fontSize: 16,
    color: '#5DADE2',
    textAlign: 'center',
    fontFamily: 'System',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 80,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4A90E2',
    top: 0,
  },
  loadingDot2: {
    transform: [{ rotate: '120deg' }],
    backgroundColor: '#5BA0F2',
  },
  loadingDot3: {
    transform: [{ rotate: '240deg' }],
    backgroundColor: '#7BB8F7',
  },
});

export default SplashScreen;


