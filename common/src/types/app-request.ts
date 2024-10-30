import { User } from '@modules/user/domain/entities/user.entity';
import { Request } from 'express';
import { Types } from 'mongoose';

export type Group = { _id: Types.ObjectId; name: string };

export type AuthUser = User & { gs: string | Group[] };

export type AuthRequest = Request & { user: AuthUser };
