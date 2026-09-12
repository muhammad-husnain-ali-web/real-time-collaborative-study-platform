import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { Purpose } from '../enum/purpose.enum';

@Entity()
export class OTP {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', nullable: false, unique: true })
    email!: string;

    @Column({ type: 'varchar', nullable: true })
    otp!: string;

    @Column({ type: 'timestamp', nullable: true })
    otpExpiry!: Date;

    @Column({ type: 'timestamp', nullable: true })
    resendAllowedAfter!: Date;

    @Column({
        type: 'enum',
        enum: Purpose,
        default: Purpose.Register,
    })
    purpose!: Purpose;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;
}