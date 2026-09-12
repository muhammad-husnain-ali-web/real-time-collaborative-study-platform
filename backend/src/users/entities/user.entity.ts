import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

import { Role } from '../enum/role.enum';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', nullable: false })
    name!: string;

    @Column({ type: 'varchar', nullable: false, unique: true })
    email!: string;

    @Column({ type: 'varchar', nullable: false })
    password!: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.Student,
    })
    role!: Role;

    // Profile picture URL or file path
    @Column({ type: 'varchar', nullable: true })
    avatar!: string;

    @Column({ type: 'varchar', nullable: true })
    cloudinaryId!: string;

    @Column({ type: 'boolean', default: false })
    isVerified!: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;
}
