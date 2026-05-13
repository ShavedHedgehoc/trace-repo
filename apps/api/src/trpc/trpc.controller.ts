import { All, Controller, Get, Inject, Req, Res } from '@nestjs/common';
import { nodeHTTPRequestHandler } from '@trpc/server/adapters/node-http';
import { appRouter } from '@repo/trpc';
import { TrpcService } from './trpc.service';
import { Request, Response } from 'express';
import { renderTrpcStudio } from '@srawad/trpc-studio';
import trpcSchema from './schema.json';

@Controller('trpc')
export class TrpcController {
  constructor(
    @Inject('TRPC_SERVICE')
    private readonly trpcService: TrpcService,
  ) {}

  @Get('studio')
  getStudio(@Res() res: Response) {
    if (process.env.NODE_ENV !== 'production') {
      const html = renderTrpcStudio(appRouter, {
        url: `http://localhost:${process.env.API_PORT || 7000}/trpc`,
        transformer: 'superjson',
        inputSchemas: trpcSchema.inputs,
        outputSchemas: trpcSchema.outputs,
        meta: {
          title: 'tRPC Api',
          version: '1.0.0',
        },
      });
      res.send(html);
    }
  }

  @All(':path')
  async handle(@Req() req: Request, @Res() res: Response) {
    const trpcService = this.trpcService;
    return nodeHTTPRequestHandler({
      path: req.params.path,
      req: req as any,
      res: res as any,
      router: appRouter,
      createContext: async (opts) => {
        const baseContext = await trpcService.createContext(opts);
        return baseContext;
      },
    });
  }
}
