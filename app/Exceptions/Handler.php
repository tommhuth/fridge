<?php

namespace App\Exceptions;

use App\SimpleAuth;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        HttpException::class,
        ModelNotFoundException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $e
     * @return void
     */
    public function report(Exception $e)
    {
        return parent::report($e);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $e
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $e)
    {
        $code = 500;


        if($e instanceof NotFoundHttpException)
        {
            if(SimpleAuth::pageAuthorized())
                return response()->view('app' , ['key' => SimpleAuth::getKey()]);
            else
                return redirect('/login');
        }

        if ($e instanceof ModelNotFoundException)
        {
            $e = new NotFoundHttpException($e->getMessage(), $e);
            $code = 404;
        }

        if ( $request->isXmlHttpRequest() )
        {
            return response()->json( [
                'error' => [
                    'exception' => class_basename( $e ) . ': ' . $e->getMessage(),
                ]
            ],  $code  );
        }


        return parent::render($request, $e);
    }
}
