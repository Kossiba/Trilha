import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const NetworkContext = createContext({ isConnected: true });

const NetworkProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(navigator.onLine);

  useEffect(() => {
    const updateNetworkStatus = () => setIsConnected(navigator.onLine);

    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);

    return () => {
      window.removeEventListener("online", updateNetworkStatus);
      window.removeEventListener("offline", updateNetworkStatus);
    };
  }, []);

  return (
    <NetworkContext.Provider value={{ isConnected }}>
      {children}
    </NetworkContext.Provider>
  );
};

NetworkProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useNetwork = () => useContext(NetworkContext);

export { NetworkProvider, useNetwork };
