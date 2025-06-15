import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string | '';
      name: string | '';
      email: string | '';
      totalAmount?: number | '';
      jpyAmount?: number | '';
      hisFlg: boolean;
      image?: string | '';
      createdAt?: Date | '';
      updatedAt?: Date | '';
    };
  }

  interface User {
    id: string;
    name: string | null;
    email: string;
    emailVerified?: Date | null;
    totalAmount?: number;
    jpyAmount?: number;
    hisFlg?: boolean;
    image?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
  }
}
