import CustomerOverview from '@/components/customers/CustomerOverview';
import { getUrlParameterByName } from '@/utils/helpers'

export const Customer = () => {

const customerId = getUrlParameterByName('customerId');

  return (
    <CustomerOverview customerId={customerId!}/>
  )
}

export default Customer
