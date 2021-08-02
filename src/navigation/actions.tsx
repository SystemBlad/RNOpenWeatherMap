import NavigationService from './Root';

export function goBack() {
  NavigationService.goBack();
}

export function navigateToDetails(params?: object) {
  NavigationService.navigate('DetailsScreen', params);
}
