import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';

import { Role } from '../enum/role.enum';
import { Course } from 'src/courses/entities/course.entity';

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

    @Column({ type: 'boolean', default: true })
    twoFactorEnabled!: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;

    @OneToMany(() => Course, (course) => course.teacher)
    courses!: Course[];
}
