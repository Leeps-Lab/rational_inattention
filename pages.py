from otree.api import Currency as c, currency_range
from ._builtin import Page, WaitPage
from .models import Constants
from .models import Group
from .models import parse_config


class MainPage(Page):
    form_model = 'player'
    form_fields = ['precision', 'cost', 'm_low', 'm_high', 'low_val', 'high_val', 'bid_price', 'ask_price', 'bought', 'sold', 'round_payoff']

    def is_displayed(self):
        return self.subsession.config is not None

    def vars_for_template(self):
        return {
            'round_num': Constants.round_number(self),
            'g': self.subsession.get_g(),
            'k': self.subsession.get_k(),
            'm': self.subsession.get_m(),
            'y': self.subsession.get_y(),
            'q': self.subsession.get_q(),
            'expected_value': self.subsession.get_expected_value(),
            'default': self.subsession.get_default(),
        }

class ResultsWaitPage(WaitPage):
    pass


class Results(Page):
    def vars_for_template(self):
        pass

page_sequence = [MainPage]
