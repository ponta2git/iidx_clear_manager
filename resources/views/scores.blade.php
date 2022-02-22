@extends('layouts.app')

@section('content')

<div id="root">
</div>

@push('scripts')
<script src="{{ asset('js/scores/index.js') }}"></script>
@endpush
@endsection