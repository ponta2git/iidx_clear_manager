@extends('layouts.app')

@section('content')

<div id="root">
</div>

@push('scripts')
<script src="{{ asset('js/statistics/index.js') }}"></script>
@endpush
@endsection