module Api
  module V1
    class GeocodeController < Api::V1::BaseController

      def index
        render json: { geodata: request.location }, status: :ok
      end

    end
  end
end
