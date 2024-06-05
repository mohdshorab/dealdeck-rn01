import React from "react";
import Products from "./product";
import AuthStore from "./auth";
import CartStore from "./cart";
import FavProdStore from "./favProducts";
class Store{
    constructor(){
        // this.DealdeckStore, These properties hold the instances of the individual stores.
        this.products = new Products(this);
        this.auth = new AuthStore(this);
        this.cart = new CartStore(this);
        this.favProd = new FavProdStore(this)
    }
}
// The stores object is created as an instance of the Store class.
export const stores = new Store();

//store helpers 
// It allows components to access the stores object through the context API.
const StoreContext = React.createContext();


/* The StoreProvider component is defined as a wrapper component that provides the stores object
to its children using the StoreContext.Provider. 
This allows any child component to access the stores using the useStore hook. */
export const StoreProvider = ({children})=>(
    <StoreContext.Provider value={stores}>{children}</StoreContext.Provider>
)

// Hook to use store in any functional component
export const useStore = () => React.useContext(StoreContext);