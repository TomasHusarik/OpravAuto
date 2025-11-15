import OrderOverview from '@/components/orders/OrderOverview'
import { getUrlParameterByName } from '@/utils/helpers';

const Order = () => {
    const orderId = getUrlParameterByName('orderId');

    return (
        <OrderOverview orderId={orderId!}/>
    )
}

export default Order