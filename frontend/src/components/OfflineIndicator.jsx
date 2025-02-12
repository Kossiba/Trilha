import { useNetwork } from '../Context/NetworkProvider';
import "../styles/OfflineIndicator.css"

const OfflineIndicator = () => {
  const { isConnected } = useNetwork();

  if (isConnected) return null;

  return (
    <div className="offline-banner">
      <p>Você está offline</p>
    </div>
  );
};


export default OfflineIndicator;
