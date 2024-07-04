import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [UserModule, CoursesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
