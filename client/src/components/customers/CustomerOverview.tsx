import React, { useEffect, useState } from 'react'
import { getCustomer } from '@/utils/api'
import { Customer } from '@/types/Customer';

interface ICustomerOverview {
    customerId?: string;
}

const CustomerOverview = (props: ICustomerOverview) => {
    const { customerId } = props;
    const [customer, setCustomer] = useState<Customer>();

  const loadData = async () => {
    const usr = await getCustomer(customerId!);
    setCustomer(usr);
  }

  useEffect(() => {
    loadData();
  }, [customerId]);

  return (
    <div>{customer?.lastName}</div>
  )
}

export default CustomerOverview