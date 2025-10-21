import { useState } from "react";
import {
  useAppKitConnections,
  useAppKitConnection,
  useDisconnect,
} from "@reown/appkit/react";

export function MultiWalletTest() {
  const { connections, recentConnections } = useAppKitConnections();
  const { switchConnection, deleteConnection } = useAppKitConnection({});
  const { disconnect } = useDisconnect();
  const [lastSelected, setLastSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  const handleSwitch = async (address: string, connection: any) => {
    setLoading(`switch-${address}`);
    setLastSelected(address);
    try {
      await switchConnection({ connection, address });
      console.log("✅ Switched to:", address);
    } catch (error) {
      console.error("❌ Error switching connection:", error);
    } finally {
      setLoading(null);
    }
  };

  const handleDelete = async (address: string, connectorId: string) => {
    setLoading(`delete-${address}`);
    try {
      deleteConnection({ address, connectorId });
      console.log("✅ Deleted connection:", address);
    } catch (error) {
      console.error("❌ Error deleting connection:", error);
    } finally {
      setLoading(null);
    }
  };

  const handleDisconnect = async (connectorId: string, address: string) => {
    setLoading(`disconnect-${address}`);
    try {
      await disconnect({ id: connectorId });
      console.log("✅ Disconnected:", address);
    } catch (error) {
      console.error("❌ Error disconnecting:", error);
    } finally {
      setLoading(null);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2>Multi-Wallet Test Dashboard</h2>

      {/* Active Connections */}
      <section style={{ marginBottom: "30px" }}>
        <h3>Connected Wallets ({connections.length})</h3>
        {connections.length === 0 ? (
          <p style={{ color: "#666" }}>
            No active connections. Connect a wallet to get started.
          </p>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {connections.map((connection) => {
              const address = connection.accounts[0]?.address || "";
              return (
                <div
                  key={`${address}-${connection.connectorId}`}
                  style={{
                    padding: "15px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    background: lastSelected === address ? "#f0f9ff" : "#fff",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                      {formatAddress(address)}
                    </div>
                    <div style={{ fontSize: "0.85em", color: "#666" }}>
                      Connector: {connection.connectorId}
                    </div>
                    <div style={{ fontSize: "0.85em", color: "#666" }}>
                      Chain: {connection.caipNetwork?.id}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => handleSwitch(address, connection)}
                      disabled={loading === `switch-${address}`}
                      style={{
                        padding: "8px 16px",
                        background: "#3396FF",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        opacity: loading === `switch-${address}` ? 0.6 : 1,
                      }}
                    >
                      {loading === `switch-${address}`
                        ? "Switching..."
                        : "Switch"}
                    </button>
                    <button
                      onClick={() =>
                        handleDelete(address, connection.connectorId)
                      }
                      disabled={loading === `delete-${address}`}
                      style={{
                        padding: "8px 16px",
                        background: "#ff9800",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        opacity: loading === `delete-${address}` ? 0.6 : 1,
                      }}
                    >
                      {loading === `delete-${address}`
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                    <button
                      onClick={() =>
                        handleDisconnect(connection.connectorId, address)
                      }
                      disabled={loading === `disconnect-${address}`}
                      style={{
                        padding: "8px 16px",
                        background: "#f44336",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        opacity: loading === `disconnect-${address}` ? 0.6 : 1,
                      }}
                    >
                      {loading === `disconnect-${address}`
                        ? "Disconnecting..."
                        : "Disconnect"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Recent Connections */}
      <section>
        <h3>Recent Connected Wallets ({recentConnections.length})</h3>
        {recentConnections.length === 0 ? (
          <p style={{ color: "#666" }}>No recent connections.</p>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {recentConnections.map((connection) => {
              const address = connection.accounts[0]?.address || "";
              return (
                <div
                  key={`${address}-${connection.connectorId}`}
                  style={{
                    padding: "15px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    background: "#f9f9f9",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                      {formatAddress(address)}
                    </div>
                    <div style={{ fontSize: "0.85em", color: "#666" }}>
                      Connector: {connection.connectorId}
                    </div>
                    <div style={{ fontSize: "0.85em", color: "#666" }}>
                      Chain: {connection.caipNetwork?.id}
                    </div>
                  </div>
                  <button
                    onClick={() => handleSwitch(address, connection)}
                    disabled={loading === `switch-${address}`}
                    style={{
                      padding: "8px 16px",
                      background: "#4caf50",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      opacity: loading === `switch-${address}` ? 0.6 : 1,
                    }}
                  >
                    {loading === `switch-${address}`
                      ? "Reconnecting..."
                      : "Reconnect"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Info Section */}
      <section
        style={{
          marginTop: "30px",
          padding: "15px",
          background: "#e3f2fd",
          borderRadius: "8px",
        }}
      >
        <h4>How to Test Multi-Wallet:</h4>
        <ol style={{ marginLeft: "20px" }}>
          <li>
            Click "Connect Wallet" button at the top to connect your first
            wallet
          </li>
          <li>
            After connecting, click "Connect Wallet" again to add another wallet
          </li>
          <li>Use the "Switch" button to change the active wallet</li>
          <li>Use "Delete" to remove a connection from the list</li>
          <li>Use "Disconnect" to fully disconnect a wallet</li>
        </ol>
      </section>
    </div>
  );
}
