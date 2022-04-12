import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: `http://localhost:${process.env.PORT_FE}/auth`,
      scope: ['profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { provider, id } = profile;
    const user = {
      provider,
      subId: id,
      profileImageUrl: `https://${
        process.env.AWS_S3_BUCKET_NAME
      }.s3.amazonaws.com/users/${Math.floor(Math.random() * 9) + 1}.png`,
    };
    done(null, user);
  }
}
