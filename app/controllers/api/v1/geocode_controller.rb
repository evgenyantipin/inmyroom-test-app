module Api
  module V1
    class GeocodeController < ApplicationController

      def index
        render json: { geodata: request.location }, status: :ok
      end

    end
  end
end
