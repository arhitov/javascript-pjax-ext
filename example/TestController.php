<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Routing\Controller;
use Symfony\Component\HttpFoundation\Request;

class BaseController extends Controller
{
    public function test(Request $request): JsonResponse|View
    {
        $view = view('test', [
            'paginate' => new LengthAwarePaginator(/*..pass..*/)
        ]);

        if ($request->wantsJson() && $request->exists('pjax-ext')) {
            $section = $request->get('section');
            return new JsonResponse([
                'section' => empty($section)
                    ? $view->renderSections()
                    : array_intersect_key($view->renderSections(), array_flip(explode(',', $section))),
            ], 200);
        }

        return $view;
    }
}
