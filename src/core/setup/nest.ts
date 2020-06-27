import {INestApplication} from "@nestjs/common";
import { ApiParamsValidationPipe } from '../pipes/api-params-validation.pipe';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
export default (app:INestApplication) => {
    // 注册并配置全局验证管道
    app.useGlobalPipes(new ApiParamsValidationPipe());
    // 注册全局http异常过滤器
    app.useGlobalFilters(new HttpExceptionFilter());
};