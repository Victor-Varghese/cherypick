
Fixed issue1
Fixed issue2
Fixed isue 4
Fixed issue 5

Fixing issue 6778	
import React, { Component } from 'react'
import { Platform, NativeModules } from 'react-native'
import { Route, Switch } from 'react-router'

import Stack from 'react-router-native-stack'

import Orientation from 'react-native-orientation'
import RNDeviceInfo from 'react-native-device-info'
import StoreProvider from './store'
import Router from './navigation/router'
import { NavigationGlobalProvider } from './navigation/global-context'

import Cart from '../screens/cart/screen'
import Payments from '../screens/payments/screen'
import CreditCardKeyIn from '../screens/payments/credit-card-key-in'
import Cash from '../screens/payments/cash/screen'
import Clubs from '../screens/clubs'
import Customer from '../screens/customer'
import Home from '../screens/home'
import Loading from '../screens/loading'
import Login from '../screens/login'
import Logout from '../screens/logout'
import OperatorScreen from '../screens/operator/screen'
import Sale from '../screens/sale'
import { ModifyScreen } from '../screens/modify'
import Discount from '../screens/discount/screen'
import Receipt from '../screens/receipt'
import OrderQueueScreen from '../screens/order-queue/screen'
import KioskLandingScreen from '../screens/kiosk-landing/screen'
import KioskRegistration from '../screens/kiosk-landing/registration'
import KioskCustomerSelection from '../screens/kiosk-landing/select-customer'
import KioskCheckedIn from '../screens/kiosk-landing/checked-in'
import OrderDetailScreen from '../screens/order-queue/order-detail/screen'

import { ClubProvider } from './state/club'
import { ButtonsProvidor } from './state/global-buttons-state'
import { OrderProvider } from './state/order'
import { CustomerProvider } from './state/customer'
import { KioskCheckinProvider } from './state/kiosk-checkin'
import { withRouteContext, withNavigationContext } from './navigation/context'
import Operations from '../screens/operations'
import { OperationsProvider } from './state/operations'
import { AppProvider } from './state/app'
import { OrderQueueProvider } from '../screens/order-queue/context'
import Support from '../screens/support'
import Carousel from '../screens/carousel'
import { withProviders } from '../utils/context'
import { changeEnv } from '../app/data/requests'
import Cache from '../utils/storage'

// First we import some modules...

const NavRoute = ({ component, ...props }) => (
	<Route {...props} component={withRouteContext (withNavigationContext (component))} />
)

class App extends Component {
	componentDidMount () {
		if (Platform.OS === 'android' && !RNDeviceInfo.isTablet ()) Orientation.lockToPortrait ()
		Cache.getInstance().GetData('env').then((value) => {
			if (value !== null && value !== false) 
				changeEnv(value)
		})
	}

	componentWillUnmount () {
		
	}

	render () {
		
		return (
			<Router>
				<Switch>
					<NavRoute exact path="/" component={Loading} animationType="none" />
					<NavRoute path="/cart" component={Cart} />
					<NavRoute path="/payments" component={Payments} />
					<NavRoute path="/credit-card-key-in" component={CreditCardKeyIn} />
					<NavRoute path="/cash" component={Cash} />
					<NavRoute path="/clubs" component={Clubs} />
					<NavRoute path="/customer" component={Customer} animationType="none" />
					<NavRoute path="/login" component={Login} animationType="none" />
					<NavRoute path="/logout" component={Logout} animationType="none" />
					<NavRoute path="/operator" component={OperatorScreen} />
					<NavRoute path="/discount" component={Discount} />
					<NavRoute path="/operations" component={Operations} animationType="none" />
					<NavRoute path="/sale" component={Sale} animationType="none" />
					<NavRoute path="/home" component={Home} animationType="cube" />
					<NavRoute path="/modify/:productId" component={ModifyScreen} />
					<NavRoute path="/receipt" component={Receipt} animationType="slide-vertical" />
					<NavRoute path="/order-queue" component={OrderQueueScreen} />
					<NavRoute path="/kiosk-landing" component={KioskLandingScreen} />
					<NavRoute path="/kiosk-registration/phone/:phone" component={KioskRegistration} />
					<NavRoute path="/kiosk-registration/email/:email" component={KioskRegistration} />
					<NavRoute path="/kiosk-registration" component={KioskRegistration} />
					<NavRoute path="/kiosk-select-customer" component={KioskCustomerSelection} />
					<NavRoute path="/checked-in" component={KioskCheckedIn} />
					<NavRoute path="/order-detail" component={OrderDetailScreen} />
					<NavRoute path="/support" component={Support} />
					<NavRoute path="/carousel" component={Carousel} />
				</Switch>
			</Router>
		)
	}
}

export default withProviders (App, [
	StoreProvider,
	AppProvider,
	OrderQueueProvider,
	ClubProvider,
	ButtonsProvidor,
	CustomerProvider,
	OrderProvider,
	OperationsProvider,
	KioskCheckinProvider,
	NavigationGlobalProvider,
])
