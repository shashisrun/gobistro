import React from 'react';
import Title from '../components/title'
import ProductList from '../components/productList'
import { useDomain } from '../contexts/domainContext';
import { useAuth } from '../contexts/authContext';
import { getDocuments, where, documentId } from '../config/firebase';

export default function Cart() {
    const [meals, setMeals] = React.useState([]);
    const { domain } = useDomain();
    const { user } = useAuth();
    React.useEffect(() => {
        if (domain && user && user.profile && user.profile.cart) {
            const cartItems = [];
            for (let i = 0; i < user.profile.cart.length; i++) {
                cartItems.push(user.profile.cart[i].id);
            }
            if (cartItems.length) {
                const whereFavQuery = where(documentId(), "in", cartItems)
                getDocuments(`restaurants/${domain.domain}/foods`, whereFavQuery).then((data) => {
                    setMeals(data);
                });
            }
        }
    }, [domain, user])
    return (
        <>
            <ProductList meals={meals} showCategory={false} initTitle={'In Your Cart'} compact={true} />
        </>
    )
}