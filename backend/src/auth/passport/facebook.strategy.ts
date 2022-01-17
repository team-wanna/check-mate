import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: `http://localhost:${process.env.PORT_FE}/auth`,
      // profileFields: ['emails', 'photos'],
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
