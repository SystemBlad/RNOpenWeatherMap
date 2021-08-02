import NavigationService from './Root';

export function goBack() {
  NavigationService.goBack();
}

export function navigateToLogin(params?: object) {
  NavigationService.replace('LoginScreen', params);
}

export function navigateToHome(params?: object) {
  NavigationService.reset('HomeScreen', params);
}

export function navigateToCustomer(params?: object) {
  NavigationService.navigate('CustomerScreen', params);
}

export function navigateToPwsRecovery(params?: object) {
  NavigationService.navigate('PwsRecoveryScreen', params);
}

export function navigateToCodeVerify(params?: object) {
  NavigationService.navigate('CodeVerifyScreen', params);
}

export function navigateToProfileScreen(params?: object) {
  NavigationService.navigate('ProfileScreen', params);
}

export function navigateToPwsUpdateScreen(params?: object) {
  NavigationService.navigate('PwsUpdateScreen', params);
}

export function navigateToPin(params?: object) {
  NavigationService.navigate('PinScreen', params);
}

export function pushToPin(params?: object) {
  NavigationService.push('PinScreen', params);
}

export function navigateToOrders(params?: object) {
  NavigationService.navigate('OrdersScreen', params);
}
