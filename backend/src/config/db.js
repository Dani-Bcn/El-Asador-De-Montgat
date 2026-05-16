import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState === 1) {
    isConnected = true;
    return;
  }

  const mongoUri = process.env.DB ;

  if (!mongoUri) {
    throw new Error("Falta configurar DB o MONGODB_URI en las variables de entorno");
  }

  try {
    const db = await mongoose.connect(mongoUri);

    isConnected = db.connections[0].readyState === 1;

    console.log("✅ MongoDB conectado");
  } catch (error) {
    console.error("❌ Error MongoDB:", error);
    throw error;
  }
};

export default connectDB;
