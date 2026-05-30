import crypto from 'crypto';
import SellerAgent from '../models/sellerAgent.model.js';
import { buildSellerAgentPrompt } from '../services/sellerAgent.service.js';
import { generateResponse } from '../services/ai.service.js';

export const createSellerAgent = async (req, res) => {
    try {
        const userId = req.user.id;
        const agentData = req.body;

        // Generate unique slug
        const slug = crypto.randomBytes(4).toString('hex');
        
        // Generate AI prompt
        const generatedPrompt = buildSellerAgentPrompt(agentData);

        const newAgent = new SellerAgent({
            user: userId,
            slug,
            ...agentData,
            generatedPrompt
        });

        await newAgent.save();

        res.status(201).json({
            message: "Seller Agent created successfully",
            agent: newAgent,
            publicUrl: `/agent/${slug}`
        });

    } catch (error) {
        console.error("Error creating seller agent:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getMyAgents = async (req, res) => {
    try {
        const userId = req.user.id;
        const agents = await SellerAgent.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json({ agents });
    } catch (error) {
        console.error("Error fetching agents:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getAgentBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const agent = await SellerAgent.findOne({ slug });

        if (!agent) {
            return res.status(404).json({ message: "Agent not found" });
        }

        // Return public-facing data (exclude sensitive info like minAcceptablePrice, generatedPrompt, etc.)
        const publicData = {
            productName: agent.productName,
            category: agent.category,
            brand: agent.brand,
            productDescription: agent.productDescription,
            sellingPrice: agent.sellingPrice,
            originalPurchasePrice: agent.originalPurchasePrice,
            productCondition: agent.productCondition,
            purchaseDate: agent.purchaseDate,
            accessoriesIncluded: agent.accessoriesIncluded,
            sellerName: agent.sellerName,
            createdAt: agent.createdAt
        };

        res.status(200).json({ agent: publicData });

    } catch (error) {
        console.error("Error fetching agent by slug:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const chatWithAgent = async (req, res) => {
    try {
        const { slug } = req.params;
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ message: "Messages array is required" });
        }

        const agent = await SellerAgent.findOne({ slug });
        
        if (!agent) {
            return res.status(404).json({ message: "Agent not found" });
        }

        // Pass the agent's specific prompt to the AI service
        const aiResponse = await generateResponse(messages, agent.generatedPrompt);

        res.status(200).json({ response: aiResponse });

    } catch (error) {
        console.error("Error in agent chat:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
