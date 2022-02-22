@extends('layouts.app')

@section('content')

<div class="box">
    <div class="box-content">
        <p>ユーザー情報を編集できます。</p>
        @if(Session::has('successmsg'))
        <p class="successmsg">{{ session('successmsg') }}</p>
        @endif
        <form action="{{ route('update_setting') }}" method="POST"
            id="setting-form" name="setting-form">
            @csrf
            <div class="form-group">
                <div class="input-info">
                    <label for="name">スクリーンネーム</label>
                    <p class="input-helper">必須</p>
                </div>
                <input type="text" id="name" name="name" 
                value="{{ old('name', $loginUser->name) }}" @error('email') class="error" @enderror>
                @error('name')
                <p class="errormsg">{{ $message }}</p>
                @enderror
            </div>
            <div class="form-group">
                <div class="input-info">
                    <label for="email">メールアドレス</label>
                </div>
                <input readonly type="text" id="email" name="email"
                value="{{ $loginUser->email }}">
            </div>
            <div class="form-group">
                <div class="input-info">
                    <label for="iidxid">IIDX ID</label>
                    <p class="input-helper">半角数字8ケタ（ハイフンなし）</p>
                </div>
                <input type="text" id="iidxid" name="iidxid"
                value="{{ old('iidxid', $loginUser->iidxid) }}" @error('iidxid') class="error" @enderror>
                @error('iidxid')
                <p class="errormsg">{{ $message }}</p>
                @enderror
            </div>
            <div class="form-group">
                <div class="input-info">
                    <label for="dan_i">段位</label>
                    <p class="input-helper">段位を設定すると、変更時のクリアランプ状況が保存されます。</p>
                </div>
                <select id="dan_i" name="dan_i">
                    <option value="">なし</option>
                    @foreach ($dan_i as $dan)
                    <option
                        value="{{$dan->id}}"
                        {{$my_dan_i->dan_i === $dan->id 
                            || old('dan_i') === (string)$dan->id ? 'selected' : '' }}>
                        {{$dan->name}}
                    </option>
                    @endforeach
                </select>
            </div>
            <div class="form-group">
                <div class="input-info">
                    <input type="checkbox" id="change-password" name="change-password[]" 
                    {{ old('change-password') ? "checked" : ""}} onclick="togglePasswordForm()">
                    <label for="change-password" style="display:inline;vertical-align:top">パスワードを変更する</label>
                </div>
            </div>
            <div id="input-new-password">
            <div class="form-group">
                <div class="input-info">
                    <label for="password">新しいパスワード</label>
                    <p class="input-helper">半角英数字記号8ケタ以上</p>
                </div>
                <input type="password" id="password" name="password" value="{{ old('password') }}" @error('password') class="error" @enderror>
                @error('password')
                <p class="errormsg">{{ $message }}</p>
                @enderror
            </div>
            <div class="form-group">
                <div class="input-info">
                    <label for="password_confirmation">確認</label>
                    <p class="input-helper">上と同じパスワードを入力してください。</p>
                </div>
                <input type="password" id="password_confirmation" name="password_confirmation" value="{{ old('password_confirmation') }}" @error('password_confirmation') class="error" @enderror>
                @error('password_confirmation')
                <p class="errormsg">{{ $message }}</p>
                @enderror
            </div>
            </div>
            <div class="form-buttons">
                <button type="submit" class="btn-ok">更新</button>
            </div>
        </form>
        <div id="logout"><p><a href="{{ route('logout') }}">ログアウト</a></p></div>
    </div>
</div>

<script type="text/javascript">
const togglePasswordForm = () => {
    let checkbox = document.getElementById("change-password");
    let form = document.getElementById("input-new-password");

if (checkbox.checked) {form.style.display = 'block';}
else {form.style.display = 'none';}
}

togglePasswordForm();
</script>
@endsection