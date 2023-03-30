import stripe from 'tipsi-stripe'
import {stripeKey, merchantId} from '../../../config/keys'

export default function StripeInit () {
  stripe.setOptions({
    publishableKey: stripeKey,
    // merchantId: merchantId, // Optional
    // androidPayMode: 'test', // Android only
  })
}