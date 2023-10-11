
@section('table')
    <div data-pjax-ext-section="table">
        pass
    </div>
@endsection

@section('pagination')
    <div data-pjax-ext-section="pagination">
        {{ $paginate->links() }}
    </div>
@endsection

<button type="button" onclick="pjaxExtRun()">Update</button>

<script>
function pjaxExtRun() {
    pjaxExt(new URL('http://localhost/test'))
        .setSection(['table', 'pagination'])
        .load();
}
</script>