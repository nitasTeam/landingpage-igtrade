{
  description = "Bun-based frontend development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            # Bun - primary package manager and runtime
            bun

            # Node.js (for compatibility with some tools)
            nodejs_20

            # Git
            git

            # Additional development tools
            nodePackages.typescript
            nodePackages.typescript-language-server
            
            # Optional: useful frontend tools
            # nodePackages.prettier
            # nodePackages.eslint
          ];

          shellHook = ''
            echo "🚀 Bun frontend development environment"
            echo "Bun version: $(bun --version)"
            echo "Node version: $(node --version)"
            echo ""
            echo "Ready for development! 🎉"
          '';

          # Environment variables
          NIXPKGS_ALLOW_UNFREE = "1";
        };
      }
    );
}

