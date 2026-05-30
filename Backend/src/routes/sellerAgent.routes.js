import { Router } from 'express';
import { authUser } from '../middleware/auth.middleware.js';
import { 
    createSellerAgent, 
    getMyAgents, 
    getAgentBySlug, 
    chatWithAgent 
} from '../controllers/sellerAgent.controller.js';

const agentRouter = Router();

// Protected Routes
agentRouter.post('/seller', authUser, createSellerAgent);
agentRouter.get('/seller/mine', authUser, getMyAgents);

// Public Routes
agentRouter.get('/:slug', getAgentBySlug);
agentRouter.post('/:slug/chat', chatWithAgent);

export default agentRouter;
