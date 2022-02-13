<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class OAuthTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();
        $this->providerName = 'twitter';
    }

    /**
     * @test
     */
    public function Googleの認証画面を表示できる()
    {
        // URLをコール
        $this->get(route('getProviderOAuthURL', ['provider' => $this->providerName]))
            ->assertStatus(200);

        $target = parse_url($response->headers->get('location'));
        
        // リダイレクト先ドメインの検証
        $this->assertEquals('accounts.google.com', $target['host']);

        // パラメータの検証
        $query = explode('&', $target['query']);
        $this->assertContains('redirect_uri=' . urlencode(config('services.google.redirect')), $query);
        $this->assertContains('client_id=' . config('services.google.client_id'), $query);
    }

}